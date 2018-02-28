#!/usr/bin/env python
# encoding: utf-8

"""
@author: 水痕
@contact: 332904234@qq.com
@file: schema.py
@time: 2018/2/26 11:32
@desc:
"""
import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Author, Book, Category


# 定义数据类型
class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        # filter_fields = ['name']
        # interfaces = (graphene.relay.Node,)


class BookType(DjangoObjectType):
    class Meta:
        model = Book


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


# 定义输入数据类型(根据model来书写,本人直接写在mutation里面)
class AuthorInput(graphene.InputObjectType):
    pass


class BookInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    price = graphene.Float()
    category = graphene.Int(required=True)
    author = graphene.Int(required=True)


class CategoryInput(graphene.InputObjectType):
    pass


# 定义查询
class Query(object):
    # 根据id或者作者名字查询
    author = graphene.Field(AuthorType, id=graphene.Int(), name=graphene.String())
    # 查询全部的作者
    all_author = graphene.List(AuthorType)
    # 只根据id查询图书
    book = graphene.Field(BookType, id=graphene.Int(required=True))
    # 查询全部的图书
    all_book = graphene.List(BookType)
    # 查询全部的分类
    all_category = graphene.List(CategoryType)

    def resolve_author(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')
        if id is not None:
            return Author.objects.get(pk=id)
        if name is not None:
            return Author.objects.get(name=name)
        return None

    def resolve_all_author(self, info, **kwargs):
        return Author.objects.all()

    def resolve_book(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Book.objects.get(pk=id)
        return None

    def resolve_all_book(self, info, **kwargs):
        return Book.objects.all().order_by('-update_at')

    def resolve_all_category(self, info, **kwargs):
        return Category.objects.all()


# 定义创建作者的操作
class CreateAuthor(graphene.Mutation):
    class Input(object):
        name = graphene.String(required=True)

    status = graphene.Int()
    author = graphene.Field(AuthorType)

    def mutate(self, info, name):
        author = Author.objects.create(name=name)
        return CreateAuthor(author=author, status=200)


# 定义创建分类的操作
class CreateCategory(graphene.Mutation):
    class Input(object):
        name = graphene.String(required=True)

    status = graphene.Int()
    data = graphene.Field(CategoryType)

    def mutate(self, info, name):
        category = Category.objects.create(name=name)
        return CreateCategory(data=category, status=200)


# 定义创建图书的操作
class CreateBook(graphene.Mutation):
    class Input(object):
        book_data = BookInput()

    # 约束返回数据类型
    status = graphene.Int()
    data = graphene.Field(BookType)

    def mutate(self, info, book_data):
        book = Book.objects.create(name=book_data['name'], price=book_data['price'], category_id=book_data['category'],
                                   author_id=book_data['author'])
        return CreateBook(data=book, status=200)


# 定义一个修改图书的操作
class UpdateBook(graphene.Mutation):
    class Input(object):
        id = graphene.Int(required=True)
        book_data = BookInput()

    status = graphene.Int()
    data = graphene.Field(BookType)

    def mutate(self, info, id, book_data):
        book = Book.objects.get(pk=id)
        if book_data['name'] is not None:
            book.name = book_data['name']
        if book_data['price'] is not None:
            book.price = book_data['price']
        if book_data['category'] is not None:
            book.category_id = book_data['category']
        if book_data['author'] is not None:
            book.author_id = book_data['author']
        book.save()
        return UpdateBook(data=book, status=200)


# 定义一个删除图书的操作
class DelBook(graphene.Mutation):
    class Input(object):
        id = graphene.Int(required=True)

    status = graphene.Int()

    def mutate(self, info, id):
        book = Book.objects.get(pk=id)
        book.delete()
        return DelBook(status=200)


# 定义一个统一的mutation
class Mutations(graphene.AbstractType):
    create_author = CreateAuthor.Field()
    create_category = CreateCategory.Field()
    create_book = CreateBook.Field()
    update_book = UpdateBook.Field()
    del_book = DelBook.Field()
