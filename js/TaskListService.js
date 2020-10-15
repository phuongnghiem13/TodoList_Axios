function TaskListService() {
  this.getListService = function() {
    return axios({
      url: "https://5f83b9a86b97440016f4e928.mockapi.io/api/Task",
      method: "GET",
    })
  };

  this.deleteListService = function(id){
    return axios({
      url: `https://5f83b9a86b97440016f4e928.mockapi.io/api/Task/${id}`,
      method: "DELETE",
    })
  };

  this.addTaskService = function(task){
    return axios({
      url: "https://5f83b9a86b97440016f4e928.mockapi.io/api/Task",
      method: "POST",
      data: task,
    })
  };

  this.getTaskById = function(id){
    return axios({
      url: `https://5f83b9a86b97440016f4e928.mockapi.io/api/Task/${id}`,
      method: "GET",
    })
  };

  this.updateTask = function(task){
    return axios({
      url: `https://5f83b9a86b97440016f4e928.mockapi.io/api/Task/${task.id}`,
      method: "PUT",
      data: task,
    })
  }
}