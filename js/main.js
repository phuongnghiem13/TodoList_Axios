var listTask = new TaskListService();
var validation = new Validation();
var arrTask = [];

var isLoading = true;
getListTaskService();

function getListTaskService() {
  isLoading = true;
  Loading();
  listTask.getListService().then(function (result) {
    isLoading = false;
    Loading();
    taoBang(result.data);
    arrTask = result.data;
  })

    .catch(function (err) {
      console.log(err);
    });
}

function taoBang(arr) {
  if (arr) {
    var content = "";
    var content1 = "";
    arr.forEach(function (item) {
      if (item.status !== "complete") {
        content += `
        <li>
          <span>${item.taskName}</span>
          <div class="buttons">
            <button class="remove" onclick="deleteTask(${item.id})"><i class="fa fa-trash-alt"></i></button>
            <button class="complete" onclick="changeStatus(${item.id})"><i class="far fa-check-circle"></i></button>
          </div>
        </li>
      `;
      } else if (item.status === "complete") {
        content1 += `
        <li>
          <span>${item.taskName}</span>
          <div class="buttons">
            <button class="remove" onclick="deleteTask(${item.id})"><i class="fa fa-trash-alt"></i></button>
            <button class="complete" onclick="changeStatus(${item.id})"><i class="fas fa-check-circle"></i></button>
          </div>
        </li>
      `;
      }
    });

    getEle("todo").innerHTML = content;
    getEle("completed").innerHTML = content1;
  }
}

function deleteTask(id) {
  isLoading = true;
  Loading();
  listTask.deleteListService(id).then(function (result) {
    getListTaskService();
  })

    .catch(function (err) {
      console.log(err);
    });
}

//Thêm Task todo
getEle("addItem").addEventListener("click", function () {
  // Loading
  var input = getEle("newTask").value;
  var isValid = true;
  isValid &= validation.kiemTraRong(input, "notiInput", "Vui lòng nhập Task");

  if (!isValid) return;

  isValid &= validation.kiemTraTrungTask(input, "notiInput", "Task bị trùng", arrTask);

  if (!isValid) return;

  isLoading = true;
  Loading();
  var task = new Task("", input, "todo");
  listTask.addTaskService(task)
    .then(function (rs) {
      getEle("newTask").value = "";
      getListTaskService();
    })
    .catch(function (err) {
      console.log(err);
    });
})

//Change Status
function changeStatus(id) {
  // Loading
  isLoading = true;
  Loading();

  listTask.getTaskById(id)
    .then(function (rs) {
      checkStatus(rs.data);
      var id = rs.data.id;
      var taskName = rs.data.taskName;
      var status = rs.data.status;

      var task = new Task(id, taskName, status);
      listTask.updateTask(task)
        .then(function (rs) {
          // console.log(rs.data);
          getListTaskService();
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    .catch(function (err) {
      console.log(err);
    });


}

//Chuyển trạng thái
function checkStatus(task) {
  if (task.status === "todo") {
    task.status = "complete";
  } else {
    task.status = "todo";
  }
}

function Loading() {
  if (isLoading) {
    document.getElementsByClassName("loader")[0].style.display = "block";
    document.getElementsByClassName("card__todo")[0].style.opacity = "0";
  } else {
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementsByClassName("card__todo")[0].style.opacity = "1";
  }
}

function getEle(id) {
  return document.getElementById(id);
}