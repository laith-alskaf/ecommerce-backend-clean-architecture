// Use Cases
import {
    LoginUseCase,
    RegisterUseCase,
    VerifiyEmailUseCase,
    ChangePasswordUseCase,
    ForgotPasswordUseCase,
} from '../../application/use-cases/auth';

// Repository
import { MongoUserRepository } from '../../infrastructure/repositories/mongo-user.repository';

//Controller
import { AuthController } from '../controllers/auth.controller';


//Services
import { NodemailerGmailService } from '../../infrastructure/srevices/nodemailer-gmail.service';
import { BcryptPasswordHasher } from '../../infrastructure/srevices/bcrypt-password-hasher';
import { OTPGeneratorService } from '../../infrastructure/srevices/otp-generator';
import { UuidGeneratorService } from '../../infrastructure/srevices/uuid-generator.service';
import { JwtTokenService } from '../../infrastructure/srevices/jwt-token.service';

interface AuthDependenciesType {
    tokenService: JwtTokenService;
    userRepository: MongoUserRepository;
    encryptionService: BcryptPasswordHasher;
    emailService: NodemailerGmailService;
    otpGeneratorService: OTPGeneratorService,
    uuidGeneratorService: UuidGeneratorService
}

export const AuthDependencies = ({
    tokenService,
    userRepository,
    encryptionService,
    emailService,
    otpGeneratorService,
    uuidGeneratorService
}: AuthDependenciesType): AuthController => {

    // Use Cases
    const registerUseCase = new RegisterUseCase(
        emailService,
        userRepository,
        encryptionService,
        otpGeneratorService,
        uuidGeneratorService
    );
    const loginUseCase = new LoginUseCase(
        tokenService,
        userRepository,
        encryptionService,
    );
    const forgotPasswordUseCase = new ForgotPasswordUseCase(
        userRepository,
        emailService,
        otpGeneratorService
    );
    const verifiyEmailUseCase = new VerifiyEmailUseCase(
        emailService,
        userRepository,
    );

    const changePasswordUseCase = new ChangePasswordUseCase(
        userRepository,
        encryptionService,
        emailService
    );
    const authController: AuthController = new AuthController(
        registerUseCase,
        loginUseCase,
        forgotPasswordUseCase,
        verifiyEmailUseCase,
        changePasswordUseCase
    );


    return authController;


}