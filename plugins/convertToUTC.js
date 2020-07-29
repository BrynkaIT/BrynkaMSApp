 //Convert UTC time to Mid-night local time.
export default ({ app }, inject) => {
    inject('convertToUTC', (date)=> {
        let d = new Date(date)
        const offset = d.getTimezoneOffset()
        d = new Date(d.getTime() + (offset * 60 * 1000))
        return d.toISOString()
    });
  }