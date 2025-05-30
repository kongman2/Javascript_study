const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTczNDdhZTE3ZjZjMzc5NzhhNzAzZDdmYjMxMTVkOCIsIm5iZiI6MTc0ODM5NDA5Ni4yODQsInN1YiI6IjY4MzY2MDcwMGE0ZWNhYjBkNjgzOGIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRtnGv5d1GvijAuiBNxhaJNrdWRkcDEYpiuqNGdHzqY',
   },
}
const urlParams = new URLSearchParams(location.search)
const tvId = urlParams.get('tv_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 1. TV 상세정보
const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHTML = `
               <div class="row">
                  <div class="col-sm-3"
                  style="text-align: center">
                     <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%" />
                  </div>
                  <div class="col-sm-9 tv-detail">
                     <h2>${data.name}</h2>
                     <ul class="tv-info">
                        <li>원제${data.original_name} ${data.original_language}</li>
                        <li>최근방영일 ${data.last_air_date}</li>
                        <li>처음방영일 ${data.first_air_date}</li>
                        <li>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</li>
                     </ul>
                     <p>${data.overview}</p>
                  </div>
               </div>
       `
      mainContainer.innerHTML += rowHTML

      await getDetailTvSeasons(tvDetailUrl)
      await getCreditsTv(tvCreditsUrl)
   } catch (error) {
      console.error('에러발생: ', error)
   }
}

getDetailTv(tvDetailUrl)

// 2. 시즌

const getDetailTvSeasons = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()
      const seasons = data.seasons

      let seasonRowHTML = ' <div class="row" style="margin-top:30px">'

      for (let i = 0; i < seasons.length; i++) {
         const average = `${Number(seasons[i].vote_average) === 0 ? '미반영' : seasons[i].vote_average.toFixed(1)}`

         seasonRowHTML += `
         <div class="col-sm-12"
         style="text-align: center">
            <ul class="tv-seasons">
               <li><a href= #>${seasons[i].name}(${average})보러가기 -${seasons[i].air_date} 방영</a></li>
               </ul>
            </div>
         `
      }

      seasonRowHTML += '</div>'
      mainContainer.innerHTML += seasonRowHTML
   } catch (error) {
      console.error('에러발생: ', error)
   }
}

// 3. 출연진

const tvCreditsUrl = `https://api.themoviedb.org/3/tv/${tvId}/credits?language=ko-KR`
const getCreditsTv = async (tvCreditsUrl) => {
   try {
      const response = await fetch(tvCreditsUrl, options)
      const data = await response.json()

      let castRowHTML = ' <div class="row" style="margin-top:30px">'

      for (let i = 0; i < data.cast.length; i++) {
         if (i === 6) break

         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHTML += `
          <div class='col-sm-2 p-3' >
           <div class="card">
              <img src="${profileImg}" class="card-img-top" alt="${data.cast[i].name}">
               <div class="card-body">
                  <p class="card-text">${data.cast[i].name}</p>
               </div>
           </div>
        </div>
         `
      }
      castRowHTML += '</div>'
      mainContainer.innerHTML += castRowHTML
   } catch (error) {
      console.error('에러발생: ', error)
   }
}
