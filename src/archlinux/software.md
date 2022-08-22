# 部分软件安装和配置记录

## 中文输入法 fcitx5

> 输入法还是很重要的，毕竟有了输入法你才能描述你的问题给**搜索引擎**,`fcitx5-pinyin-zhwiki` 和 `fcitx5-pinyin-moegirl` 是词库

```shell
yay -S fcitx5-im  fcitx5-chinese-addons fcitx5-pinyin-zhwiki fcitx5-pinyin-moegirl

# 推荐两个皮肤
yay -S community/fcitx5-nord
yay -S ommunity/fcitx5-material-color
```

配置

```shell
# ~/.pam_environment
GTK_IM_MODULE DEFAULT=fcitx5
QT_IM_MODULE  DEFAULT=fcitx5
XMODIFIERS    DEFAULT=@im=fcitx5
INPUT_METHOD  DEFAULT=fcitx5
SDL_IM_MODULE DEFAULT=fcitx
```

## KDE 窗口装饰器

> #KDE

```shell
# 更新后不建议安装
sudo pacman -S archlinuxcn/sierrabreeze-kwin-decoration-git
```

## Code OSS

Code 是 Visual Studio Code 的替代品，即不带微软官方私有的纯开源编译版本

> #VSCode

<https://wiki.archlinux.org/title/Visual_Studio_Code>

```shell
yay -S code

# 切换微软扩展源

yay -S code-marketplace
```

## 坚果云

说实话，坚果云的安装有点运气成分在里面

```shell
yay -S nutstore
```

## WPS Office

> #WPS

```shell
# 这里安装的是国内版本，国际版本请将 `aur/wps-office-cn` 替换成 `aur/wps-office`

yay -S aur/wps-office-cn aur/wps-office-mui-zh-cn aur/ttf-wps-fonts
```

## LibreOffice

```shell
sudo pacman -Ss libreoffice-fresh libreoffice-fresh-zh-cn
```

## Clash

> #Clash

### 安装

```shell
sudo pacman -S clash
```

### 安装 `Country.mmdb`

[`Country.mmdb`](https://github.com/alecthw/mmdb_china_ip_list/blob/master/README.md)

### 配置文件位置

```yml
# file： ~/.config/clash/config.yml
external-controller: 127.0.0.1:9090
# secret: 'admin.123'
# 配置 Web UI  请安装 yacd，该包在 ArchLinuxCN 源中
external-ui: '/usr/share/yacd'
```

### 配置 Systemd 服务

```service
# 下方的 `hencter` 为当前用户名

# 使用 `echo $USER` 查看当前用户名
# file: /etc/systemd/system/clash.service
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/bin/clash -d /home/hencter/.config/clash

[Install]
WantedBy=multi-user.target
```

```shell
sudo systemctl enable clash
sudo systemctl start clash
```

### 浏览器访问 UI 控制界面

直接访问下方地址即可

<https://127.0.0.1:9090/ui>

## Virtualbox

> #Virtualbox

```shell
yay -S  community/virtualbox-host-dkms community/virtualbox archlinuxcn/virtualbox-ext-oracle community/virtualbox-guest-iso core/net-tools

# 加载 Virtualbox 内核模块
sudo modprobe vboxdrv vboxnetadp vboxnetflt

# 使用下面命令检查 Virtualbox 模块加载
# 该命令需要在 Root 权限下运行
sudo vboxreload

# 将当前用户添加到 `vboxusers` 用户组中
sudo gpasswd -a $USER vboxusers
```
