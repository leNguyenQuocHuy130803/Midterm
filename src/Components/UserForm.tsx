import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../UserProvider';
import { useNavigate } from 'react-router-dom';

// Form data interface
interface TaskFormData {
    name: string;
    email: string;
    age?: number;
}

// Yup schema
const validationSchema: yup.ObjectSchema<TaskFormData> = yup.object({
    name: yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
    email: yup.string().required('Email is required').email('Invalid email'),
    age: yup.number().required('Age is required').min(0, 'Must be positive'),
});

export default function UserForm() {

    const navigate = useNavigate();
    const { addUser } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset
    } = useForm<TaskFormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: TaskFormData) => {
        console.log('Form Data:', data);
        addUser(data);
        reset();
        navigate('/users');
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded" style={{ maxWidth: 500, margin: '0 auto' }} autoComplete="off">
                <h4 className="mb-4">User Registration</h4>

                {/* Name */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                {/* Age */}
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        id="age"
                        type="number"
                        {...register('age')}
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`btn w-100 ${isSubmitting || !isValid ? 'btn-secondary disabled' : 'btn-success'}`}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>

                <div className="mt-3 text-center">
                    <small className={`fw-semibold ${isValid ? 'text-success' : 'text-danger'}`}>
                        {isValid ? '✓ Form is valid' : 'Please fill in all required fields correctly'}
                    </small>
                </div>

            </form>
        </div>
    );
}
