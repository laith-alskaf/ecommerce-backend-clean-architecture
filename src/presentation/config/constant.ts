/**
 * رموز حالة HTTP المستخدمة في التطبيق
 */
export const StatusCodes = {
    // رموز النجاح (2xx)
    OK: 200,                   // طلب ناجح
    CREATED: 201,              // تم إنشاء مورد جديد
    NO_CONTENT: 204,           // طلب ناجح بدون محتوى للإرجاع

    // رموز أخطاء العميل (4xx)
    BAD_REQUEST: 400,          // طلب غير صالح
    UNAUTHORIZED: 401,         // غير مصرح (تحتاج إلى مصادقة)
    FORBIDDEN: 403,            // محظور (ليس لديك صلاحية)
    NOT_FOUND: 404,            // المورد غير موجود
    CONFLICT: 409,             // تعارض (مثل تكرار البيانات)
    UNPROCESSABLE_ENTITY: 422, // بيانات غير صالحة للمعالجة

    // رموز أخطاء الخادم (5xx)
    INTERNAL_SERVER_ERROR: 500, // خطأ داخلي في الخادم
    SERVICE_UNAVAILABLE: 503    // الخدمة غير متوفرة
};

/**
 * رسائل التطبيق المستخدمة في الواجهات
 */
export const Messages = {
    // رسائل المصادقة
    AUTH: {
        REGISTER_SUCCESS: "تم تسجيل المستخدم بنجاح. يرجى التحقق من بريدك الإلكتروني للتحقق.",
        REGISTER_SUCCESS_EN: "User registered successfully. Please check your email for verification.",

        LOGIN_SUCCESS: "تم تسجيل الدخول بنجاح.",
        LOGIN_SUCCESS_EN: "Login successful.",

        LOGOUT_SUCCESS: "تم تسجيل الخروج بنجاح.",
        LOGOUT_SUCCESS_EN: "Logged out successfully.",

        VERIFY_SUCCESS: "تم التحقق من البريد الإلكتروني بنجاح.",
        VERIFY_SUCCESS_EN: "Email verification successful.",

        RESET_PASSWORD_SUCCESS: "تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.",
        RESET_PASSWORD_SUCCESS_EN: "Password reset successfully. You can now log in with your new password.",

        FORGOT_PASSWORD_SUCCESS: "تم إرسال بريد إلكتروني لإعادة تعيين كلمة المرور. يرجى التحقق من صندوق الوارد الخاص بك.",
        FORGOT_PASSWORD_SUCCESS_EN: "Password reset email sent. Please check your inbox.",

        REFRESH_TOKEN_SUCCESS: "تم تحديث الرمز المميز بنجاح.",
        REFRESH_TOKEN_SUCCESS_EN: "Token refreshed successfully.",

        RESEND_VERIFICATION_SUCCESS: "يرجى التحقق من بريدك الإلكتروني للتحقق.",
        RESEND_VERIFICATION_SUCCESS_EN: "Please check your email for verification.",

        // رسائل خطأ المصادقة
        INVALID_CREDENTIALS: "بيانات الاعتماد غير صالحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.",
        INVALID_CREDENTIALS_EN: "Invalid credentials. Please check your email and password.",

        EMAIL_ALREADY_EXISTS: "البريد الإلكتروني مسجل بالفعل.",
        EMAIL_ALREADY_EXISTS_EN: "Email is already registered.",

        USERNAME_ALREADY_EXISTS: "اسم المستخدم مسجل بالفعل.",
        USERNAME_ALREADY_EXISTS_EN: "Username is already taken.",

        VERIFICATION_REQUIRED: "يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول.",
        VERIFICATION_REQUIRED_EN: "Please verify your email before logging in.",

        INVALID_TOKEN: "رمز مميز غير صالح أو منتهي الصلاحية.",
        INVALID_TOKEN_EN: "Invalid or expired token.",

        AUTHENTICATION_REQUIRED: "المصادقة مطلوبة.",
        AUTHENTICATION_REQUIRED_EN: "Authentication required."
    },

    // رسائل المستخدم
    USER: {
        GET_INFO_SUCCESS: "تم الحصول على معلومات المستخدم بنجاح.",
        GET_INFO_SUCCESS_EN: "User information retrieved successfully.",

        UPDATE_INFO_SUCCESS: "تم تحديث معلومات المستخدم بنجاح.",
        UPDATE_INFO_SUCCESS_EN: "User information updated successfully.",

        DELETE_ACCOUNT_SUCCESS: "تم حذف الحساب وإنهاء الجلسة بنجاح.",
        DELETE_ACCOUNT_SUCCESS_EN: "Account deleted and session cleared successfully.",

        // رسائل خطأ المستخدم
        USER_NOT_FOUND: "المستخدم غير موجود.",
        USER_NOT_FOUND_EN: "User not found.",

        UNAUTHORIZED_ACTION: "غير مصرح لك بهذا الإجراء.",
        UNAUTHORIZED_ACTION_EN: "You are not authorized to perform this action."
    },

    // رسائل المنتج
    PRODUCT: {
        CREATE_SUCCESS: "تم إنشاء المنتج بنجاح.",
        CREATE_SUCCESS_EN: "Product created successfully.",

        UPDATE_SUCCESS: "تم تحديث المنتج بنجاح.",
        UPDATE_SUCCESS_EN: "Product updated successfully.",

        DELETE_SUCCESS: "تم حذف المنتج بنجاح.",
        DELETE_SUCCESS_EN: "Product deleted successfully.",

        GET_SUCCESS: "تم الحصول على المنتج بنجاح.",
        GET_SUCCESS_EN: "Product retrieved successfully.",

        GET_ALL_SUCCESS: "تم الحصول على جميع المنتجات بنجاح.",
        GET_ALL_SUCCESS_EN: "All products retrieved successfully.",

        // رسائل خطأ المنتج
        NOT_FOUND: "المنتج غير موجود.",
        NOT_FOUND_EN: "Product not found.",

        NOT_FOUND_PRODUCTS: "لم يتم العثور على منتجات.",
        NOT_FOUND_PRODUCTS_EN: "No products found.",

        // رسالة عندما يتم تحديد أن المنتج غير موجود عند الحذف أو التحديث
        NOT_FOUND_OPERATION: "المنتج غير موجود أو غير قابل للتحديث أو الحذف.",
        NOT_FOUND_OPERATION_EN: "The product does not exist or cannot be updated/deleted.",

        // رسالة عند فشل البحث أو عدم وجود نتائج
        NO_RESULTS: "لم يتم العثور على نتائج مطابقة.",
        NO_RESULTS_EN: "No matching results found.",
        VALIDATION: {
            PRODUCT_VALIDATION: {
                TITLE_REQUIRED: "عنوان المنتج مطلوب",
                TITLE_REQUIRED_EN: "Product title is required",

                STOCK_INVALID: "كمية المخزون يجب أن تكون رقماً",
                STOCK_INVALID_EN: "Stock quantity must be a number",

                DESCRIPTION_REQUIRED: "وصف المنتج مطلوب",
                DESCRIPTION_REQUIRED_EN: "Product description is required",

                PRICE_REQUIRED: "سعر المنتج مطلوب",
                PRICE_REQUIRED_EN: "Product price is required",

                PRICE_INVALID: "السعر يجب أن يكون رقماً",
                PRICE_INVALID_EN: "Price must be a number",

                CATEGORY_REQUIRED: "معرف الفئة مطلوب",
                CATEGORY_REQUIRED_EN: "Category ID is required",

                IMAGE_URI_INVALID: "يجب أن يكون رابط الصورة صالحاً",
                IMAGE_URI_INVALID_EN: "Image URL must be valid"
            },

            PAGINATION_VALIDATION: {
                PAGE_INVALID: "رقم الصفحة يجب أن يكون رقماً",
                PAGE_INVALID_EN: "Page number must be a number",

                PAGE_MIN: "رقم الصفحة يجب أن يكون أكبر من أو يساوي 1",
                PAGE_MIN_EN: "Page number must be at least 1",

                LIMIT_INVALID: "حد العناصر يجب أن يكون رقماً",
                LIMIT_INVALID_EN: "Limit must be a number",

                LIMIT_MIN: "حد العناصر يجب أن يكون أكبر من أو يساوي 1",
                LIMIT_MIN_EN: "Limit must be at least 1"
            },

            SEARCH_VALIDATION: {
                CATEGORY_NOT_FOUND: "الفئة غير موجودة",
                CATEGORY_NOT_FOUND_EN: "Category not found",

                USER_NOT_FOUND: "المستخدم غير موجود",
                USER_NOT_FOUND_EN: "User not found",

                TITLE_INVALID: "عنوان المنتج يجب أن يكون نصاً",
                TITLE_INVALID_EN: "Product title must be a string",

                CATEGORY_ID_INVALID: "معرف الفئة يجب أن يكون نصاً",
                CATEGORY_ID_INVALID_EN: "Category ID must be a string",

                CREATOR_ID_INVALID: "معرف المنشئ يجب أن يكون نصاً",
                CREATOR_ID_INVALID_EN: "Creator ID must be a string"
            },

            GENERAL_VALIDATION: {
                PRODUCT_ID_REQUIRED: "معرف المنتج مطلوب",
                PRODUCT_ID_REQUIRED_EN: "Product ID is required",

                PRODUCT_DATA_REQUIRED: "بيانات المنتج مطلوبة",
                PRODUCT_DATA_REQUIRED_EN: "Product data is required",

                ID_INVALID: "المعرف يجب أن يكون نصاً",
                ID_INVALID_EN: "ID must be a string"
            }
        },
    },

    // رسائل الفئة
    CATEGORY: {
        CREATE_SUCCESS: "تم إنشاء الفئة بنجاح.",
        CREATE_SUCCESS_EN: "Category created successfully.",

        UPDATE_SUCCESS: "تم تحديث الفئة بنجاح.",
        UPDATE_SUCCESS_EN: "Category updated successfully.",

        DELETE_SUCCESS: "تم حذف الفئة بنجاح.",
        DELETE_SUCCESS_EN: "Category deleted successfully.",

        GET_SUCCESS: "تم الحصول على الفئة بنجاح.",
        GET_SUCCESS_EN: "Category retrieved successfully.",

        GET_ALL_SUCCESS: "تم الحصول على جميع الفئات بنجاح.",
        GET_ALL_SUCCESS_EN: "All categories retrieved successfully.",

        // رسائل خطأ الفئة
        NOT_FOUND: "الفئة غير موجودة.",
        NOT_FOUND_EN: "Category not found.",

        NOT_FOUND_CATEGORIES: "لم يتم العثور على فئات.",
        NOT_FOUND_CATEGORIES_EN: "No categories found."
    },

    // رسائل عامة
    GENERAL: {
        INTERNAL_ERROR: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.",
        INTERNAL_ERROR_EN: "An unexpected error occurred. Please try again later.",

        INVALID_REQUEST: "طلب غير صالح. يرجى التحقق من البيانات المدخلة.",
        INVALID_REQUEST_EN: "Invalid request. Please check your input data.",

        SUCCESS: "تمت العملية بنجاح.",
        SUCCESS_EN: "Operation completed successfully.",

        FORBIDDEN: "غير مسموح لك بالوصول إلى هذا المورد.",
        FORBIDDEN_EN: "You are not allowed to access this resource."
    }
};

/**
 * أدوار المستخدمين في النظام
 */
export const UserRoles = {
    SUPER_ADMIN: 'superAdmin',
    ADMIN: 'admin',
    USER: 'user'
};

/**
 * أنواع الملفات المسموح بها للرفع
 */
export const AllowedFileTypes = {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

/**
 * حدود وقيود النظام
 */
export const Limits = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 ميجابايت
    MAX_PRODUCTS_PER_PAGE: 50,
    DEFAULT_PAGE_SIZE: 10,
    PASSWORD_MIN_LENGTH: 6
};