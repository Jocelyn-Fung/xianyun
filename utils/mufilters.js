export const dateForm = (data, spe) => {
  data = new Date(data)
  spe = spe || '-'
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  if(month<10){
    month = '0'+month
  }
  var date = data.getDate()
  if(date<10){
    date = '0'+date
  }
  var hour = data.getHours()
  if(hour<10){
    hour = '0'+hour
  }
  var mins = data.getMinutes()
  if(mins<10){
    mins = '0'+mins
  }
  return year + spe + month + spe + date + spe + hour + ' : ' + mins
}

