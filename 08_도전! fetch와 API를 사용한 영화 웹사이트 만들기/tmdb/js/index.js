const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',

      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTczNDdhZTE3ZjZjMzc5NzhhNzAzZDdmYjMxMTVkOCIsIm5iZiI6MTc0ODM5NDA5Ni4yODQsInN1YiI6IjY4MzY2MDcwMGE0ZWNhYjBkNjgzOGIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRtnGv5d1GvijAuiBNxhaJNrdWRkcDEYpiuqNGdHzqY',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const res = await fetch(url, options) //
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')

      let rowsHTML = '' // 모든 row를 담을 변수

      // card는 5행 4열
      //results.length = 20
      for (let i = 0; i < results.length; i += 4) {
         let rowHTML = '<div class="row">' // 하나의 row를 담을 변수
         for (let j = 0; j < 4; j++) {
            const index = i + j
            // if (index >= results.length) break //results 배열을 벗어나면 중단

            const movie = results[index]
            // console.log(movie)

            rowHTML += `                
            <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="#">
                           <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${movie.vote_average.toFixed(1)}점</p>
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
getPlayingMovies(url)
