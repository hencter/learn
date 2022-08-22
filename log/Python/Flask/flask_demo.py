from flask import Flask  # 导入包

# 之前验证妹妹那边的一个服务所写

app = Flask(__name__)


@app.route("/")
def index():
    return "I Love Flask!"


@app.route("/hello")
def hello():
    return "欢迎您"


@app.route("/bye/<name>")
def bye(name):
    return "再见，" + name + "，欢迎再来"


if __name__ == '__main__':  # __main__ 整个程序的入口
    app.run(port=8080)
