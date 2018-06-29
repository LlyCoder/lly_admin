export default {
  menuList: [
    {
      "id": 1,
      "parentId": null,
      "sort": 0,
      "name": "测试",
      "href": "/index",
      "icon": "fa fa-dashboard",
      "children": [],
      "isShow": "1"
    },
    {
      "id": 2,
      "parentId": null,
      "sort": 1,
      "name": "文章管理",
      "href": "/test/1",
      "icon": "fa fa-file-text",
      "children": [
        {
          "id": 92,
          "parentId": 2,
          "sort": 0,
          "name": "文章列表",
          "href": "/articleList",
          "icon": "fa fa-list-alt",
          "isShow": "1"
        },
        {
          "id": 93,
          "parentId": 2,
          "sort": 0,
          "name": "发布文章",
          "href": "/post",
          "icon": "fa fa-plus",
          "children": [],
          "isShow": "1"
        }
      ],
      "isShow": "1"
    },
    {
      "id": 3,
      "parentId": null,
      "sort": 3,
      "name": "标签管理",
      "href": "/ta",
      "icon": "fa fa-tag",
      "children": [
        {
          "id": 13,
          "parentId": 3,
          "sort": 0,
          "name": "标签列表",
          "href": "/taglist",
          "icon": "fa fa-list-alt",
          "children": [],
          "isShow": "1"
        },
        {
          "id": 23,
          "parentId": 3,
          "sort": 0,
          "name": "添加标签",
          "href": "/addtags",
          "icon": "fa fa-plus",
          "children": [],
          "isShow": "1"
        }
      ],
      "isShow": "1"
    },
    {
      "id": 6,
      "parentId": null,
      "sort": 6,
      "name": "信息维护",
      "href": "/sys",
      "icon": "fa fa-cog",
      "children": [
        {
          "id": 108,
          "parentId": 6,
          "sort": 0,
          "name": " 资源管理",
          "href": "/sys/resource",
          "icon": "fa fa-database",
          "children": [],
          "isShow": "1"
        },
        {
          "id": 7,
          "parentId": 6,
          "sort": 1,
          "name": "菜单管理",
          "href": "/sys/menuList",
          "icon": "fa fa-navicon",
          "children": [],
          "isShow": "1"
        },
        {
          "id": 8,
          "parentId": 6,
          "sort": 1,
          "name": "角色管理",
          "href": "/sys/roleList",
          "icon": "fa fa-universal-access",
          "children": [],
          "isShow": "1"
        },
        {
          "id": 9,
          "parentId": 6,
          "sort": 3,
          "name": "用户管理",
          "href": "/userList",
          "icon": "fa fa-user-plus",
          "children": [],
          "isShow": "1"
        }
      ],
      "isShow": "1"
    }
  ]
}