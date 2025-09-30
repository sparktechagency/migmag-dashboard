import Swal from 'sweetalert2';

export const logoutAlert = () => {
    return Swal.fire({
        title: "Are you sure you want to logout?",
        text: "You will need to login again to access your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
    });
};
