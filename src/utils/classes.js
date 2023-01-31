const classes = {
    section: {
        marginTop: 1,
        marginBottom: 1,
    },
    main: {
        marginTop: 2,
        minHeight: '80vh',
    },
    footer: {
        marginTop: 1,
        textAlign: 'center',
        '& a': {
            textDecoration: 'none',
        },
        '& a:hover': {
            textDecoration: 'underline',
        },
    },
    appbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#ffffff',
            marginLeft: 1,
            textDecoration: 'none',
        },
        '& a:hover': {
            textDecoration: 'underline',
        },
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 1,
        marginBottom: 1,
    },
    link: {
        textDecoration: 'none',
        color: '#203040',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
};

export default classes;
