### 运行效果
![1.png](https://github.com/kuangshp/django-graphql-vue/blob/master/1.png "")
### 一、关于`django+graphql`的使用可以参考[传送门](http://blog.csdn.net/kuangshp128/article/details/79370351)

### 二、设置`django`项目允许跨域访问
* 1、[参考文档](https://github.com/ottoyiu/django-cors-headers)
* 2、安装包

    ```python
    pip install django-cors-headers
    ```
    
* 3、注册到`app`中

    ```python
    INSTALLED_APPS = (
        ...
        'corsheaders',
        ...
    )
    ```
    
* 4、在中间件中加入代码

    ```python
    MIDDLEWARE = [  # Or MIDDLEWARE_CLASSES on Django < 1.10
        ...
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        ...
    ]
    ```
    
* 5、设置

    ```python
    CORS_ORIGIN_ALLOW_ALL = True
    ```
    
### 三、取消`django`的`csrf`跨站攻击的

* 1、具体代码

    ```python
    MIDDLEWARE = [
        ...,
        # 'django.middleware.csrf.CsrfViewMiddleware',
        ....,
    ]
    ```
    
### 五、在`vue`中使用`vue-graphql`桥联`graphql`接口[参考文章](http://blog.csdn.net/kuangshp128/article/details/78946217)

