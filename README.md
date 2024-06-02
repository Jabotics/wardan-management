# D3 Admin

Welcome to d3-admin!

## Prerequisites

Before you get started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) - We recommend using Node Version Manager (nvm) to manage your Node.js versions.

## Installation

1. ___Install nvm___
   Instead of using npm to install and uninstall Node versions for your different projects, you can use nvm, which helps you effectively manage your node versions for each project.
   * **For Windows**

     --> Navigate to nvm-window repository on windows or [click here](https://github.com/coreybutler/nvm-windows/releases).

     --> Install the latest version `nvm-setup.exe`

     --> Open the file that you have downloaded, and complete the installation wizard.

     --> When done, you can confirm that nvm has been installed by running:

        ```bash
         nvm -v
        ```
   * **For Linux**

     --> In your terminal, run the nvm installer like this
        ```bash
         curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
         # or
         wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        ```
     --> If throws any error like `curl: (28) Failed to connect to raw.githubusercontent.com port 443: Connection timed out [closed]`

     Run this command
     ```bash
     sudo nano /etc/hosts
     ```
     ```bash
     185.199.108.133 raw.githubusercontent.com
     ```

     and then try installing again.



     --> You can use curl or bash depending on the command available on your device.

     --> These commands will clone the nvm repository to a <pre>~/.nvm</pre> directory on your device.

     --> Update your profile configuration

      <pre>
      If you're using zsh, that would be ~/.zshrc. If you're using bash, that would be ~/.bash_profile...
      or some other profile.
      </pre>

      ```bash
       export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
      ```
     --> __Reload the Shell__

      ```bash
      source ~/.bashrc
      ```
       and then open new terminal and check the version of nvm by **`nvm -v`**
     
   * **For Mac**

     --> __Install Homebrew__

        ```shell
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
        ```
     --> __Install nvm__
        ```shell
        brew install nvm
        ```
     --> __Add nvm to shell profile__
        ```shell
        source $(brew --prefix nvm)/nvm.sh
        ```

   --> **`THE USAGE OF NVM`**

       nvm use <node-version>

3. Clone the repository:

   ```bash
   git clone https://github.com/[your-username]/d3-admin.git
   ```
