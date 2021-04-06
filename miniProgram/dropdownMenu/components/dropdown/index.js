// components/dropdown/index.js
import { getWindowHeightRpx, getWindowHeightPx } from '../../utils/util';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 延时动画
    duration: {
      type: Number,
      value: .2,
      observer(duration) {
        this.setData({duration})
      }
    },
    // 显示或隐藏
    showOrHide: {
      type: Boolean,
      value: false,
      observer(showOrHide) {
        this.setData({ showOrHide });
      },
    },
    // 菜单栏的高度
    menuHeight: {
      type: Number,
      value: 100
    },
    // 顶部的高度
    topHeight: {
      type: Number,
      value: 100,
    },
    // nav数据
    menu: {
      type: Array,
      observer(menu) {
        this.setData(menu);
      },
    },
    // 选项数据
    options: {
      type: Array,
      observer(options) {
        this.setData(options);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: getWindowHeightPx(),
    menu: [],
    options: [],
    duration: 0.2, // 延时时间
    overlay: 'display:none;', // 是否覆盖, 默认none
    showOrHide: false, // 是否显示，默认false
    maskClassConversion: 'mask-leave', // 遮罩层显示样式，默认mask-leave
    selectIndex: -1, // 默认选中的下标
    // 下拉选项，被选中那组的数据，由下面的js控制赋值
    selectedItem: [],
    // 下拉选项的隐藏和显示，默认隐藏
  },

  lifetimes: {
    attached: function () {
      const that = this;
      // 在组件实例进入页面节点树时执行
      const query = this.createSelectorQuery()
      query.select('#menu').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        // res[0].top       // #the-id节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        that.setData({
          topHeight: res[0].top + res[0].height,
        })
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      // // console.log(e, '=====e');
      let { index } = e.currentTarget.dataset;
      // this.triggerEvent('handleClick', index);
      // 展示的样式动画
      this.openOverlay(index);
      // const index = e.detail;
      const { options, menu } = this.data;
      // 点击事件，开始时一定会执行的，先令所有下拉选项先隐藏
      this.setData({
        showOrHide: false
      })
      // 定义一个延迟0.1秒的函数，和函数动画事件对上
      setTimeout(() => {
        // 当点击的是已经点开的菜单项，则隐藏
        if (this.data.selectIndex === index) {
          menu[index].isActive = false
          // 重置所有样式
          this.setData({
            menu,
            selectIndex: -1
          })
          return;
        }
        // 令当前点击的菜单栏高亮
        menu.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
          showOrHide: true,
          selectedItem: options[index].rank,
          menu,
          selectIndex: index
        })
      }, 100)
    },
    closeMask(e) {
      // 获取点击的下拉选项内容
      let { id, contact } = e.currentTarget.dataset;
      // 隐藏的样式动画
      this.closeOverlay();
      let { menu, selectIndex, selectedItem } = this.data;
      // const { contact, id } = e.detail;
      // console.log(id, contact, selectIndex, '===contact');

      if (contact) {
        // 被点击的下拉选项高亮
        selectedItem.forEach((v) => v.text === contact ? v.itemIsActive = true : v.itemIsActive = false)
      }
      // 判断点击的是遮罩层还是下拉选项，如果是下拉选项则把选择的内容赋值到导航栏上，并且把v.isActive = false，让菜单栏高亮消失
      // 如果不是，不用赋值，直接把v.isActive = false，让菜单栏高亮消失
      contact ? (menu.forEach((v, i) => {
        (i === selectIndex ? (v.text = contact) : (v.text = v.text));
        v.isActive = false
      })) : (menu.forEach((v) => v.isActive = false));
      // 拿到listNum对应的navItem的数据，对比id，如果相同，直接退出并关闭；
      if (id == undefined || menu[selectIndex].selectedId == id) {
        this.setData({
          selectIndex: -1,
          showOrHide: false,
          menu,
          selectedItem
        })
        // 通知父级
        // this.triggerEvent('closeMask', selectedItem);
        return;
      }
      // 否则继续其他操作，并发送请求获取数据
      menu[selectIndex].selectedId = id;
      this.setData({
        selectIndex: -1,
        showOrHide: false,
        menu,
        selectedItem,
      });
      // 通知父级
      this.triggerEvent('closeMask', menu);
    },
    // 打开延时时间展示覆盖
    openOverlay(index) {
      let { duration, selectIndex } = this.data;
      if (selectIndex === index) {
        this.closeOverlay();
        return;
      }
      // 获取延时时间
      this.setData({
        overlay: '',
        maskClassConversion: 'mask-active',
      })
      setTimeout(() => {
        this.setData({
          maskClassConversion: '',
        })
      }, duration * 1000)
    },
    // 根据延时时间展示覆盖
    closeOverlay() {
      // 获取延时时间
      this.setData({
        maskClassConversion: 'mask-leave',
      })
      let { duration } = this.data;
      setTimeout(() => {
        this.setData({
          overlay: 'display:none;',
          maskClassConversion: '',
        })
      }, duration * 1000);
    },
  }
})

