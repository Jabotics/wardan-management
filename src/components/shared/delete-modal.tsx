import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSpring, animated } from '@react-spring/web'

interface FadeProps {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true)
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true)
        }
      },
    })

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    )
  }
)

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 180,
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: 'none',
  p: 4,
  borderRadius: '16px',
}

export default function DeleteModal({
  open,
  handleClose,
  handleDelete,
  numSelected,
}: {
  open: boolean
  handleClose: () => void
  handleDelete: () => void
  numSelected: number,
}) {
  return (
    <Modal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id='spring-modal-title' variant='h6' component='h2' sx={{ mt: -1, fontFamily: "'Ubuntu', sans-serif", color: "#333333" }}>
            Delete
          </Typography>
          <Typography id='spring-modal-description' sx={{ mt: 1, fontSize: 15, fontFamily: "'RobotoR', sans-serif" }}>
            Are you sure want to delete {numSelected} item? This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button onClick={handleDelete} sx={{ mr: 2 }} color="error" variant="contained">
              Delete
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
