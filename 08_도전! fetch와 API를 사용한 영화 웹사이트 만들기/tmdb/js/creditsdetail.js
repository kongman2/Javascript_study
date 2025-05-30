const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTczNDdhZTE3ZjZjMzc5NzhhNzAzZDdmYjMxMTVkOCIsIm5iZiI6MTc0ODM5NDA5Ni4yODQsInN1YiI6IjY4MzY2MDcwMGE0ZWNhYjBkNjgzOGIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRtnGv5d1GvijAuiBNxhaJNrdWRkcDEYpiuqNGdHzqY',
   },
}

const urlParams = new URLSearchParams(location.search)
const creditId = urlParams.get('credit_id')

const creditDetailUrl = `https://api.themoviedb.org/3/person/${creditId}?language=ko-KR`
const container = document.querySelector('main .container')

const getCredits = async (creditDetailUrl) => {
   try {
      const res = await fetch(creditDetailUrl, options)
      const data = await res.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.profile_path}`

      const rowHTML = `
               <div class="row">
                  <div class="col-md-3" >
                     <img src="${imgSrc}" alt="${data.name}" class="profile-detail" style="max-width:100%" />
                  </div>
                  <div class="col-md-8 credit-detail">
                     <h2>${data.name}</h2>
                     <p>인기도 ${Number(data.popularity) === 0 ? '미반영' : data.popularity.toFixed(1)}</p>
                      <p>출생지 ${data.place_of_birth}</p>
                      <p>출생년도 ${data.birthday}</p>
                      <p>출생년도 ${data.birthday}</p>
                  </div>
               </div>
        `

      container.innerHTML += rowHTML
      getCreditKnownfor(url)
   } catch (error) {
      console.error('에러발생: ', error)
   }
}
getCredits(creditDetailUrl)

// 필모그래피

const url = 'https://api.themoviedb.org/3/person/popular?language=ko-KR&page=1&with_original_language=ko'

const getCreditKnownfor = async () => {
   try {
      const res1 = await fetch(url, options)
      const res2 = await fetch(creditDetailUrl, options)

      const data1 = await res1.json()
      const data2 = await res2.json()

      let fgRowHTML = ' <div class="row" style="margin-top:30px"><h4 style="text-align: center">Filmography</h4>'

      for (let i = 0; i < data1.results.length; i++) {
         if (data1.results[i].id === data2.id) {
            const fgs = data1.results[i].known_for

            fgs.map((fg) => {
               fgRowHTML += `
                  <div class='col-md-3 p-3'>
                       <div class="card">
                         <img src="https://image.tmdb.org/t/p/w200${fg.poster_path}" class="card-img-top" alt="${fg.title}">
                         <div class="card-body">
                            <p class="card-text">${fg.title}</p>
                         </div>
                      </div>
                  </div>
         `
            })
         }
      }
      fgRowHTML += '</div>'
      container.innerHTML += fgRowHTML
   } catch (error) {
      console.log('에러발생: ', error)
   }
}
