#!/usr/bin/env python
# encoding: utf-8

"""
@author: 水痕
@contact: 332904234@qq.com
@file: schema.py
@time: 2018/2/26 10:56
@desc:
"""
import graphene

import book.schema


class Query(book.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutations(book.schema.Mutations, graphene.ObjectType):
    # 总的Schema的mutations入口
    pass


schema = graphene.Schema(query=Query, mutation=Mutations)
