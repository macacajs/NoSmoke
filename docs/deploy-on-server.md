# Deploy on Server {#setup-guide}

### 1. Deploy on Mac & Windows

The installation on the above platform is simple and straight forward, please ensure you had installed the following IDEs and Languages in your system:

```
Xcode 9.0 +
Android 2.0 +
Java 8
Swift 3.0+ 
NPM 5.6+
Node 8.0+
```

And execute the following command to install the dependencies of **NoSmoke**:

```
npm i macaca-android -g
npm i macaca-ios -g
npm i macaca-cli -g
npm i macaca-electron -g
```

For developers in China, if you can not get access to google's chrome repository, please type in the following command to manually setup relevant proxies:

```
export CHROMEDRIVER_CDNURL=http://npm.taobao.org/mirrors/chromedriver/
```

After all the above dependencies successfully installed, install NoSmoke with the following command.

```
npm i nosmoke -g
```

### 2. Deploy on Linux OS

On linux OS, there is existing docker image you can use, refer to:[ https://github.com/macacajs/macaca-android-docker](https://github.com/macacajs/macaca-android-docker) for how to use it. 

**Note: **for running Android simulators on Linux OS, KVM acceleration is needed.  Not all CPU architecture supports it, please try the following command to see whether your server has a KVM compatible CPU:

```
command: kvm-ok

INFO: /dev/kvm does not exist
HINT:   sudo modprobe kvm_intel
INFO: Your CPU supports KVM extensions
INFO: KVM (vmx) is disabled by your BIOS
HINT: Enter your BIOS setup and enable Virtualization Technology (VT),
      and then hard poweroff/poweron your system
KVM acceleration can NOT be used
```

You may want to read this information to know[ how to turn on the KVM in your machine's BIOS](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/virtualization/sect-virtualization-troubleshooting-enabling_intel_vt_and_amd_v_virtualization_hardware_extensions_in_bios)







