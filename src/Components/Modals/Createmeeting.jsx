import React from 'react'
import { useForm } from 'react-hook-form';
import { token } from '../../Api/token';
import { AddMeeting } from '../../Api/Meeting';
import { toast } from 'react-toastify';

const Createmeeting = ({setModal,setPageUI,meetingfetch,tutor,coursedata,link}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
console.log(coursedata,"coursedatatata");
    const onSubmit =async(data)=>{
        try {
            console.log(data);
            const formdata={
                link:link,
                duration:data.duration,
                time:data.time,
                date:data.date,
                tutor:tutor.id,
                course:coursedata.id
            }
            const tokengenerate = await token("token-refresh-vini")
            const response = await AddMeeting(formdata,tokengenerate.access)
            if(response.success=== true){
                toast.success(`${response.message}`)
                setModal(false)
                setPageUI(true)
                meetingfetch()
                console.log(response,"success");
            }else{
                toast.error(`${response.message}`)
                console.log(response,"error");
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
          <div className="modal" tabIndex="-1" role="dialog" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
            <div className="modal-dialog" role="document">
            <div className="modal-content" style={{
          display: 'block',
          background: "rgba(102, 54, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.8px)",
          WebkitBackdropFilter: "blur(5.8px)",
          border: "1px solid rgba(255, 255, 255, 0.26)"
      }}>
                         <div className="modal-body">
                        <button
                        className="btn-close"
                       onClick={()=>{
                        setModal(false)
                        setPageUI(true)
                       }}
                        type="button"
                        >
                        </button>
                        <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group m-2 mt-4">
                            <input
                            type="text"
                            className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                            placeholder="Meeting Link"
                            value={link}
                            readOnly
                            />
                    
                        </div>
                        <div className="form-group m-2 mt-4">
                            <input
                            type="date"
                            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                            placeholder="Date"
                            {...register('date', { required: 'Date is required' })}
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                        </div>
                        <div className="form-group m-2 mt-4">
                            <input
                            type="time"
                            className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                            placeholder="Time"
                            {...register('time', { required: 'Time is required' })}
                            />
                            {errors.time && <div className="invalid-feedback">{errors.time.message}</div>}
                        </div>
                        <div className="form-group m-2 mt-4">
                            <input
                            type="text"
                            className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                            placeholder="Duration in minutes"
                            {...register('duration', { required: 'Duration is required' })}
                            />
                            {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
                        </div>
                        <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary m-2">Add Meeting</button>
                        </div>

                        </form>
                        </div>
                       
                        </div>
               </div>
              </div>
        </div>
    </div>
  )
}

export default Createmeeting