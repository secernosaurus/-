// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      {
        id: 11,
        text: '测试对私1',
        isActive: false,
        selectedId: 1,
        type: 'test',
      },
      {
        id: 21,
        text: '测试考虑1',
        isActive: false,
        selectedId: 1,
        type: 'test1',
      },
      {
        id: 31,
        text: '测试立刻1',
        isActive: false,
        selectedId: 1,
        type: 'test2',
      },
    ],
    options: [
      {
        id: 0,
        rank: [
          {
            id: 1,
            text: '测试对私1',
            itemIsActive: true,
          },
          {
            id: 2,
            text: '测试对私2',
            itemIsActive: false,
          },
          {
            id: 3,
            text: '测试对私3',
            itemIsActive: false,
          },
        ]
      },
      {
        id: 1,
        rank: [
          {
            id: 1,
            text: '测试考虑1',
            itemIsActive: true,
          },
          {
            id: 2,
            text: '测试考虑2',
            itemIsActive: false,
          },
          {
            id: 3,
            text: '测试考虑3',
            itemIsActive: false,
          },
        ]
      },
      {
        id: 2,
        rank: [
          {
            id: 1,
            text: '测试立刻1',
            itemIsActive: true,
          },
          {
            id: 2,
            text: '测试立刻2',
            itemIsActive: false,
          },
          {
            id: 3,
            text: '测试立刻3',
            itemIsActive: false,
          },
        ]
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 关闭下拉选项的函数
  // 两种情况下会关闭下拉选项
  //  1. 选择下拉选项，选择后被选的下拉选项高亮，关闭下拉选项列表
  //  2. 点击遮罩层关闭
  closeMask: function (e) {
    console.log(e.detail);
  },
})