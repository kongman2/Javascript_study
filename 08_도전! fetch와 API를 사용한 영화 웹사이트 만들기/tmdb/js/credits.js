const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTczNDdhZTE3ZjZjMzc5NzhhNzAzZDdmYjMxMTVkOCIsIm5iZiI6MTc0ODM5NDA5Ni4yODQsInN1YiI6IjY4MzY2MDcwMGE0ZWNhYjBkNjgzOGIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vRtnGv5d1GvijAuiBNxhaJNrdWRkcDEYpiuqNGdHzqY',
   },
}

const url = 'https://api.themoviedb.org/3/person/popular?language=ko-KR&page=1&with_original_language=ko'

const getCredits = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')

      let rowsHTML = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHTML = '<div class="row">'
         for (let j = 0; j < 4; j++) {
            const index = i + j

            const credits = results[index]

            rowHTML += `                
            <div class="col-md-2 p-3">
                     <div class="card">
                        <a href="./creditsDetail.html?credit_id=${credits.id}">
                           <img src="https://image.tmdb.org/t/p/w500/${credits.profile_path}" class="card-img-top profile" alt="${credits.name}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text name">${credits.name}<br/>${credits.original_name}</p>
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
getCredits(url)
