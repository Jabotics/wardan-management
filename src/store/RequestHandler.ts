import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIEndPoints } from '@/APIEndpoints'

export const RequestHandler = createApi({
  reducerPath: 'RequestHandler',
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
      headers.set('type', 'employee')
      if (token) {
        headers.set('authorization', token)
        return headers
      }
    },
  }),
  tagTypes: ['Permissions'],
  endpoints: (builder) => ({
    getRequest: builder.query({
      query: (body) => {
        const { url, ...rest } = body
        const customParams = { ...rest }
        Object.keys(customParams).forEach((item) => {
          if (
            customParams[item] == undefined ||
            customParams[item] === '' ||
            customParams[item] === '[""]'
          ) {
            delete customParams[item]
          }
        })
        return {
          url: url,
          method: 'GET',
          params: customParams,
        }
      },
    }),
    postRequest: builder.mutation({
      query: (body) => {
        const { url, ...rest } = body
        return {
          url: url,
          method: 'POST',
          body: rest,
        }
      },
      transformResponse: (Response, meta) => {
        meta?.response?.headers.get('authorization')
          ? localStorage.setItem(
              'token',
              String(meta?.response?.headers.get('authorization'))
            )
          : ''
        return { Response, meta }
      },
    }),
    imagePostRequest: builder.mutation({
      query: (body) => {
        const { url, ...rest } = body
        return {
          url: url,
          method: 'POST',
          body: rest.formData,
          formData: true,
        }
      },
      transformResponse: (Response, meta) => {
        meta?.response?.headers.get('authorization')
          ? localStorage.setItem(
              'token',
              String(meta?.response?.headers.get('authorization'))
            )
          : ''
        return Response
      },
    }),

    downloadFile: builder.mutation({
      queryFn: async (
        { url, name, ...rest },
        _api,
        _extraOptions,
        baseQuery
      ) => {
        const customParams = { ...rest }
        const incomingFileType = customParams.fileType
          ? customParams.fileType
          : null
        Object.keys(customParams).forEach((key) => {
          if (
            customParams[key as keyof object] === null ||
            customParams[key as keyof object] === undefined ||
            customParams[key as keyof object] === '' ||
            customParams[key as keyof object] === '[]'
          ) {
            delete customParams[key as keyof object]
          }
        })
        const result = await baseQuery({
          url: url,
          params: customParams,
          responseHandler: (response) => response.blob(),
        })
        if (result.error) {
          return { error: result.error }
        }
        const hiddenElement = document.createElement('a')
        const blobObj = window.URL || window.webkitURL
        const blobPDF = blobObj.createObjectURL(result.data as Blob)
        hiddenElement.href = blobPDF
        hiddenElement.target = '_blank'
        hiddenElement.download = `${name}.${incomingFileType || customParams.fileType || 'pdf'}`
        hiddenElement.click()
        return { data: null }
      },
    }),
  }),
})

export const {
  usePostRequestMutation,
  useGetRequestQuery,
  useImagePostRequestMutation,
  useDownloadFileMutation,
} = RequestHandler
