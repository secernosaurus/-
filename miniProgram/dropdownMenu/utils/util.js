// px转2rpx
const px2rpx = function (pxNumber) {
	const { screenWidth } = wx.getSystemInfoSync();
	return (750 / screenWidth) * pxNumber;
};

// 2rpx转px
const rpx2px = function (pxNumber) {
	const { screenWidth } = wx.getSystemInfoSync();
	return pxNumber / (750 / screenWidth);
};

// windowHeightRpx
const getWindowHeightRpx =  function () {
  const { windowHeight } = wx.getSystemInfoSync();
	return px2rpx(windowHeight);
};

// windowHeightPx
const getWindowHeightPx = function () {
	const { windowHeight } = wx.getSystemInfoSync();
	return windowHeight;
};

// statusBarHeightRpx
const getStatusBarHeightRpx = function () {
	const { statusBarHeight } = wx.getSystemInfoSync();
	return px2rpx(statusBarHeight);
};

// statusBarHeightPx
const getStatusBarHeightPx = function () {
	const { statusBarHeight } = wx.getSystemInfoSync();
	return statusBarHeight;
};

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export {
  px2rpx,
  rpx2px,
  getWindowHeightRpx,
  getWindowHeightPx,
  getStatusBarHeightRpx,
  getStatusBarHeightPx,
	formatTime
}
