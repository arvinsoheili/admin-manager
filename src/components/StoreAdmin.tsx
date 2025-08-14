import { Formik, Form, useField } from "formik";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { Input } from "./ui/input";
import { motion } from "motion/react";
import { Label } from "./ui/label";

export default function StoreAdmin() {
	const schema = yup.object().shape({
		name: yup.string().required(),
		age: yup.number().required().positive().integer(),
		username: yup.string().required(),
		password: yup.string().min(8).required(),
	});

	const FormikInput = ({
		label, ...props
	}: {
        label: string;
		name: string;
		type?: string;
		placeholder?: string;
	}) => {
		const [field, meta] = useField(props);

		return (
			<div className='mb-4'>
                <Label className="mb-2" htmlFor={props.name}>{label}</Label>
				<Input className="shadow-[inset_0_-1px_0px_hsl(0,0%,40%)] inset-shadow-2xs inset-shadow-neutral-900" {...field} {...props} id={props.name} />
				{meta.touched && meta.error ? (
					<p className='text-red-500 text-sm'>{meta.error}</p>
				) : null}
			</div>
		);
	};

	const MotionAlertCancel = motion(AlertDialogCancel);
    const MotionButton = motion(AlertDialogAction);

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant='outline'>Add Admin</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className='justify-center text-center mb-4'>
					<AlertDialogTitle className='text-center'>
						Add New Admin
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					<Formik
						id='add-admin-form'
						initialValues={{ name: "", age: null, username: "", password: "" }}
						validationSchema={schema}
						onSubmit={(values) => {
							console.log(values);
						}}
					>
						{({ isSubmiting }) => (
							<Form className='max-w-sm mx-auto'>
								<FormikInput label="Name:" name='name' type='text' placeholder='Name' />
								<FormikInput label="Age:" name='age' type='text' placeholder='Age' />
								<FormikInput label="Username:"
									name='username'
									type='text'
									placeholder='Username'
								/>
								<FormikInput label="Password:"
									name='password'
									type='password'
									placeholder='Password'
								/>
								<div className='flex flex-row justify-between gap-5 mt-10'>
									<MotionAlertCancel
                                    whileHover={{ backgroundColor: "hsl(0, 100%, 50%)", color: "#000" }}
                                     className='text-red-500 '>
										Cancel
									</MotionAlertCancel>
									<MotionButton whileHover={{ backgroundColor: "hsl(190, 0%, 68%)", boxShadow: "none" }} className='bg-neutral-300 text-neutral-900 w-[75%] inset-shadow-xs inset-shadow-gray-50 shadow-xl shadow-gray-950' type='submit'>
										Create
									</MotionButton>
								</div>
							</Form>
						)}
					</Formik>
				</AlertDialogDescription>
				<AlertDialogFooter></AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
