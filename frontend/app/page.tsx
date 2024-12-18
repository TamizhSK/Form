'use client';
import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, UserIcon, IdCardIcon, MailIcon, PhoneIcon, BriefcaseIcon } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [message, setMessage] = useState('');

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name': return value.length < 3 ? 'Name must be at least 3 characters long' : '';
      case 'employeeId': return !/^EMP-\d{4}$/.test(value) ? 'Employee ID must be in format EMP-XXXX' : '';
      case 'email': return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'phone': return !/^\+?[1-9]\d{9,14}$/.test(value) ? 'Invalid phone number' : '';
      case 'department': return !value ? 'Department is required' : '';
      case 'dateOfJoining': return !value ? 'Date of joining is required' : '';
      case 'role': return value.length < 3 ? 'Role must be at least 3 characters long' : '';
      default: return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData(prev => ({ ...prev, department: value }));

    const error = validateField('department', value);
    setErrors(prev => ({ ...prev, department: error }));
  };

  const handleDateOfJoiningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFormData(prev => ({ ...prev, dateOfJoining: selectedDate }));
    setErrors(prev => ({ ...prev, dateOfJoining: validateField('dateOfJoining', selectedDate) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: validateField('name', formData.name),
      employeeId: validateField('employeeId', formData.employeeId),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      department: validateField('department', formData.department),
      dateOfJoining: validateField('dateOfJoining', formData.dateOfJoining),
      role: validateField('role', formData.role),
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
      setMessage('Please correct the errors before submitting.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/api/employees/add', formData);
      setMessage('Employee record added successfully!');
      setFormData({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: '',
      });
    } catch (error) {
      setMessage('Error in adding record: Check the ID and Email');
    }
  };

  const calculateMinDate = () => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return minDate.toISOString().split('T')[0];
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg  border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-center text-xl">Employee Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-3 top-2 w-5 h-5" />
              <Input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="pl-10"/>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="relative">
              <IdCardIcon className="absolute left-3 top-2 w-5 h-5" />
              <Input name="employeeId" placeholder="Employee ID (e.g., EMP-0001)" value={formData.employeeId} onChange={handleInputChange} className="pl-10"/>
              {errors.employeeId && <p className="text-red-400 text-sm mt-1">{errors.employeeId}</p>}
            </div>
            <div className="relative">
              <MailIcon className="absolute left-3 top-2 w-5 h-5" />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="pl-10"/>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-2 w-5 h-5" />
              <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="pl-10"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Select value={formData.department} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Department"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
            </div>
            <div>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-2 w-5 h-5 z-10" />
                <Input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleDateOfJoiningChange} max={calculateMinDate()} className="pl-10"/>
              </div>
              {errors.dateOfJoining && <p className="text-red-400 text-sm mt-1">{errors.dateOfJoining}</p>}
            </div>
            <div className="relative">
              <BriefcaseIcon className="absolute left-3 top-2 w-5 h-5" />
              <Input name="role" placeholder="Role" value={formData.role} onChange={handleInputChange} className="pl-10"/>
              {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
            </div>            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">Submit</Button>
          </form>
          {message && (<p className={`mt-4 text-sm text-center ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}> {message}</p>)}
        </CardContent>
      </Card>
    </div>
  );
}