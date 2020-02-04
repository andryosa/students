/**                //advanced comment
 *EasyHTTP library
 *Library for making HTTP requests 
 *
 * @version 2.0.0
 * @author FbW4
 * MIT
 * @license MIT
 *
 **/

class EasyHTTP {
    //Make an HTTP "GET" Request
    async get(url) {
        if (localStorage.getItem('data') == null) {
            const response = await fetch(url)
            const resData = await response.json()
            this.setLocalData(resData)
            return resData
        }else{
           return this.getLocalData()
        }
    }

    //Make an HTTP "POST" Request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resData = await response.json()

        return resData
    }

    //Make an HTTP "PUT" Request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resData = await response.json()

        return resData
    }
    //Make an HTTP "DELETE" Request
    // doesnt need "DATA" input // just delets acording to the url
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const resData = await response.json()

        return resData
    }
    setLocalData(data) {
        localStorage.setItem('data', JSON.stringify(data))
    }
    getLocalData() {
        const data = JSON.parse(localStorage.getItem('data'))
        return data
    }
}