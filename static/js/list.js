
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

     var activeitem = null
    buildlist()

    function buildlist() {
        var wrapper = document.getElementById('list-wrapper')

        wrapper.innerHTML = ''

        var url = "http://127.0.0.1:8000/api/task-list/"

        fetch(url)

            .then((resp) => resp.json())
            .then(function (data) {
                console.log('Data:', data)

                var list = data

                for (var i in list) {

                    var title = `	<span class="title"> ${list[i].title}</span> `

                    if (list[i].completed == true)
                    
                    {
                        title = ` <strike class="title"> ${list[i].title}</strike> `


                    }
                    var item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                        <div style="flex:7">
                        ${ title }
                        </div>
                        <div style="flex:1">
                            <button class="btn btn-sm btn-outline-info edit">Edit </button>
                        </div>
                        <div style="flex:1">
                            <button class="btn btn-sm btn-outline-dark delete">-</button>
                        </div>
                    </div>
                `


                    wrapper.innerHTML += item

                
                }

                for (var i in list){

                    var editBtn = document.getElementsByClassName('edit')[i]
                    editBtn.addEventListener('click',(function(item){
                        return function() { editItem(item) }

                    })(list[i]))

                    
                    var deleteBtn = document.getElementsByClassName('delete')[i]
                    deleteBtn.addEventListener('click',(function(item){
                        return function() { deleteItem(item) }

                    })(list[i]))

                    var title = document.getElementsByClassName('title')[i]
                    title.addEventListener('click',(function(item){
                        return function() { strikeUnstrike(item) }

                    })(list[i]))
                }

            })
    }


    var form = document.getElementById('form-wrapper')

    form.addEventListener('submit', function (e) {

        e.preventDefault()
        console.log('Form submited')


        var url = "http://127.0.0.1:8000/api/task-create/"

        if (activeitem != null )
        {
           var url = 'http://127.0.0.1:8000/api/task-update/'+activeitem.id +'/'

        //  console.log("http://127.0.0.1:8000/api/task-update/"+activeitem.id)

            activeitem = null
        }
        var title = document.getElementById('title').value

        fetch(url,

            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json',
                        'X-CSRFToken':csrftoken,
                },
                body: JSON.stringify({ 'title': title })
            }


        )
            .then(function (response) {

                buildlist()
                document.getElementById('form').reset()
            })

    })

    function editItem(item)
    {
      
        activeitem = item
        document.getElementById('title').value = activeitem.title
    }

    function deleteItem(item){

        console.log('delete item:',item)

        var url =url = 'http://127.0.0.1:8000/api/task-delete/'+item.id +'/'
        fetch(url,
        {
            method: 'DELETE',
            headers: {
                    'Content-Type':
                        'application/json',
                        'X-CSRFToken':csrftoken,
                }
        })
        .then((response) =>{

            buildlist()
        })
    }

    function strikeUnstrike(item){

        item.completed = !item.completed
        var url =url = 'http://127.0.0.1:8000/api/task-update/'+item.id +'/'
        fetch(url,
        {
            method: 'POST',
            headers: {
                    'Content-Type':
                        'application/json',
                        'X-CSRFToken':csrftoken,
                },
            body:JSON.stringify( {'title':item.title,'completed':item.completed} )   
        })
        .then((response) =>{

            buildlist()
        })
    }


