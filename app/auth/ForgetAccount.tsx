import { Form } from '@/components/__custom__/Form';
import { EnterEmail } from './screens/ForgotAccount/EnterEmail';
import { z } from 'zod';
import { EnterNewPassword } from './screens/ForgotAccount/EnterNewPassword';
import { EnterOTP } from './screens/ForgotAccount/EnterOTP';

const Schema = z
  .object({
    email: z.string().email(),
    verificationCode: z.array(z.coerce.number()).length(6).nonempty(),
    password: z.string().min(8),
    repeatPassword: z.string()
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  });

export default function ForgetAccount() {
  return (
    <Form.Provider
      schema={Schema}
      defaultValues={{
        email: '',
        verificationCode: [],
        password: '',
        repeatPassword: ''
      }}
    >
      <Form.Screen>
        <EnterEmail />
      </Form.Screen>
      <Form.Screen>
        <EnterOTP />
      </Form.Screen>
      <Form.Screen>
        <EnterNewPassword />
      </Form.Screen>
    </Form.Provider>
  );
}
