const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTczNDdhZTE3ZjZjMzc5NzhhNzAzZDdmYjMxMTVkOCIsIm5iZiI6MTc0ODM5NDA5Ni4yODQsInN1YiI6IjY4MzY2MDcwMGE0ZWNhYjBkNjgzOGIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRtnGv5d1GvijAuiBNxhaJNrdWRkcDEYpiuqNGdHzqY',
   },
}

const url = 'https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=3&with_original_language=ko'

const getPlayingTvprogrem = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')

      let rowsHTML = ''

      //card는 2행 10열
      for (let i = 0; i < results.length; i += 2) {
         let rowHTML = '<div class="row" >'

         for (let j = 0; j < 2; j++) {
            const index = i + j

            const tvprogrem = results[index]

            rowHTML += `
            <div class="card sm-6 m-3 p-3" style="max-width: 500px">
                <div class="row g-0">
                    <div class="col-sm-4">
                     <a href="./tvdetail.html?tv_id=${tvprogrem.id}">
                         <img  src="https://image.tmdb.org/t/p/w500${tvprogrem.poster_path}" class="img-fluid " alt="${tvprogrem.name}" />
                     </a>
                    </div>
                    <div class="col-sm-8">
                         <div class="card-body">
                           <h5 class="card-title">${tvprogrem.name}</h5>
                           <p class="card-text">평점: 
                           ${Number(tvprogrem.vote_average) === 0 ? '미반영' : tvprogrem.vote_average.toFixed(1) + '점'}</p>
                            <small class="card-text multiline-ellipsis text-body-secondary">${tvprogrem.overview}</small>
                         </div>
                    </div>
                </div>
            </div>
             `
         }
         rowHTML += '</div>'
         rowsHTML += rowHTML
      }
      container.innerHTML = rowsHTML
   } catch (error) {
      console.log('에러발생: ', error)
   }
}
getPlayingTvprogrem(url)
