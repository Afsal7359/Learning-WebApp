import React from 'react'
import { useForm } from 'react-hook-form';
import { token } from '../../Api/token';
import { AddMeeting } from '../../Api/Meeting';
import { toast } from 'react-toastify';

const Createmeeting = ({setModal,setPageUI,coursedata}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit =async(data)=>{
        try {
            console.log(data);
            const formdata={
                link:data.link,
                duration:data.duration,
                time:data.time,
                date:data.date,
                tutor:coursedata.tutor_id,
                course:coursedata.id
            }
            const tokengenerate = await token("token-refresh-vini")
            const response = await AddMeeting(formdata,tokengenerate.access)
            if(response.success=== true){
                toast.success(`${response.message}`)
                setModal(false)
                setPageUI(true)
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
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
            <div className="modal-content">
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
                            {...register('link', { required: 'Meeting Link is required' })}
                            />
                            {errors.link && <div className="invalid-feedback">{errors.link.message}</div>}
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
                            placeholder="Duration"
                            {...register('duration', { required: 'Duration is required' })}
                            />
                            {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary m-2">Submit</button>
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