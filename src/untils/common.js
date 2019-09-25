import {Message} from 'element-ui';
function errorMessage(mes){
	Message({
		message:mes,
		type:'error',
		showClose:true
	})
}
function successMessage(mes){
	Message({
		message:mes,
		type:'success',
		showClose:true
	})
}
function promptMessage(mes){
	Message({
		message:mes,
		type:'prompt',
		showClose:true
	})
}

export default{
	errorMessage,
	successMessage,
	promptMessage
}