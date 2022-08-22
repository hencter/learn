# Arch Linux 踩坑记录

## 引言

这里是我的踩坑记录，基本安装现在由下面两个项目替代解决，我的基本安装现在只记录碰到的问题和参考用到的文章或者教程什么的，关于安装部分我参考了：

- Arch Tutorial <https://github.com/ArchLinuxStudio/ArchLinuxTutorial>
- Arch Linux 简明指南 <https://github.com/NakanoMikuOrg/arch-guide>

其中「简明指南」派生自「ArchTuroriali」，并且 简明指南 对虚拟机的模拟，是尽量模拟了物理机的，所以我个人更加倾向简明指南，当然，无论这两个指南写的再棒，你也要参考官方 wiki

## 基本安装

### 分区方案

由于存在不同的硬盘接口，这里的分区使用 `pn` 替代

|     挂载点      | 分区  |        大小        | 挂载顺序 |
| :-------------: | :---: | :----------------: | :------: |
|     `/mnt`      | `p3`  |      256 GiB       |    1     |
|    `[SWAP]`     | `p2`  | 「与内存大小一致」 |    2     |
| `/mnt/efi/boot` | `p1`  |      512 MiB       |    3     |
|   `/mnt/home`   | `p4`  |      剩余空间      |    4     |

## 问题记录

### `pacman` 更新时遇到「GPGME 错误：无数据」

> #issues

via: <https://zhul.in/2022/01/01/pacman-gpgme-error-no-data/>

#### 解决方案

```shell
sudo rm /var/lib/pacman/sync/*.sig
```

### 双系统时间不同步问题

原因：Windows 系统使用 UTC[^utc]

> Windows 使用 UTC 后，请记得禁用 Windows 的时间同步功能，以防 Windows 错误设置硬件时间。如上文所说，Linux 可以使用[NTP 服务](<https://wiki.archlinux.org/title/NTP_(简体中文)>)来在线同步硬件时钟。
>
> 使用 `regedit`,新建如下 DWORD 值，并将其值设为十六进制的 `1`。
>
> 右键左下角的开始菜单
>
> ```powershell
> reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f
> ```
>
> 如果以上操作不起作用，并且你使用的是 Windows 64 位系统，将 `DWORD` 修改为 `QWORD`。
>
> 如果 Windows 要求根据夏令时更新时钟，可以允许。时钟仍然是 UTC，仅是显示时间会改变。
>
> [^utc]: https://wiki.archlinux.org/title/System_time_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#Windows_%E7%B3%BB%E7%BB%9F%E4%BD%BF%E7%94%A8_UTC

### 模块缺失的警告

> 解决 Arch Linux 构建内核模块时报模块缺失的警告[^]
>
> 当我们安装完 Arch Linux 时，你会发现构建内核模块「执行下述命令」时出现警告 `==> WARNING: Possibly...` 内容
>
> ```shell
> %% 构建内核模块 %%
> sudo mkinitcpio -P
> ```
>
> 警告内容如下：
> `xhci_pci`
>
> ```WARNING
> ==> WARNING: Possibly missing firmware for module: wd719x
> ==> WARNING: Possibly missing firmware for module: aic94xx
> ==> WARNING: Possibly missing firmware for module: xhci_pci
> ```
>
> 新错误：
>
> ```WARING
> ==> WARNING: Possibly missing firmware for module: bfa
> ==> WARNING: Possibly missing firmware for module: qed
> ==> WARNING: Possibly missing firmware for module: qla1280
> ==> WARNING: Possibly missing firmware for module: qla2xxx
>
> ```

### Arch Linux CN 源 和 4edu 源

> #archlinuxcn #arch4edu #4edu

```git
# file: /etc/pacman.cfg
···
-#[multilib]
-#Include = /etc/pacman.d/mirrorlist
+[multilib]
+Include = /etc/pacman.d/mirrorlist

+[archlinuxcn]
+SigLevel = Optional TrustAll
+Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
+Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
+Server = https://repo.archlinuxcn.org/$arch

+[arch4edu]
+Server = https://mirrors.tuna.tsinghua.edu.cn/arch4edu/$arch
```

**需执行：**

```shell
# [CN源]
sudo pacman -S archlinuxcn-keyring
# [4edu源]
sudo pacman-key --recv-keys 7931B6D628C8D3BA
sudo pacman-key --finger 7931B6D628C8D3BA
sudo pacman-key --lsign-key 7931B6D628C8D3BA
```

**解决：**

```bash
yay -S wd719x-firmware aic94xx-firmware upd72020x-fw
yay -S mkinitcpio-firmware
```

### 多系统解决

~~机启动出现 `错误 sparse file not allowed archlinux`~~

```shell
sudo vim /etc/default/grub
```

对 `/etc/default/grub` 进行如下修改，如果没有这行，请直接添加 `+` 后面的内容

```git
···
-#GRUB_DISABLE_OS_PROBER=false
+GRUB_DISABLE_OS_PROBER=false
```

### 关于键盘 `F1-F12` 被识别为多媒体键

```bash

echo 0 | sudo tee /sys/module/hid_apple/parameters/fnmode

# 写入配置文件以永久保持，否则重启需要重新执行
echo "options hid_apple fnmode=0" | sudo tee -a /etc/modprobe.d/hid_apple.conf

# 执行下面命令并重启
sudo mkinitcpio -P && sudo reboot now
```

