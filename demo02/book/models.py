from django.db import models


# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=100, verbose_name='作者')
    create_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='分类')
    create_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=100, verbose_name='图书名')
    price = models.FloatField(default=0, null=True, blank=True, verbose_name='价格')
    category = models.ForeignKey(Category, related_name='book', null=True, blank=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(Author, related_name='author', on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    def __str__(self):
        return self.name
