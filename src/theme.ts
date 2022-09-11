import { green, red } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';

const breakpoints = createBreakpoints({});

const theme = (): Theme => {
    return createTheme({
        spacing: 8,
        breakpoints,
        shape: { borderRadius: 10 },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        fontSize: 16,
                        [breakpoints.down('sm')]: {
                            fontSize: 15,
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        textTransform: 'none',
                        padding: '8px 32px',
                    },
                    containedSecondary: {
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#FFB100',
                        },
                    },
                    containedPrimary: {
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#3B43F2',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderRadius: 6,
                        boxShadow: 'none',
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(59, 67, 242, 0.1)',
                        '& .MuiTableCell-root': {
                            textAlign: 'center',
                            borderBottom: '0px',
                            color: 'rgba(59, 67, 242)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            '&:first-child': {
                                borderTopLeftRadius: '0.625rem',
                                borderBottomLeftRadius: '0.625rem',
                            },
                            '&:last-child': {
                                borderTopRightRadius: '0.625rem',
                                borderBottomRightRadius: '0.625rem',
                            },
                        },
                    },
                },
            },
            MuiTableBody: {
                styleOverrides: {
                    root: {
                        '& .MuiTableCell-root': {
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            padding: '1.5rem 1rem',
                            borderColor: 'rgba(0,0,0,0.02)',
                            whiteSpace: 'nowrap',
                            '&:first-child': {
                                borderTopLeftRadius: '0.625rem',
                                borderBottomLeftRadius: '0.625rem',
                            },
                            '&:last-child': {
                                borderTopRightRadius: '0.625rem',
                                borderBottomRightRadius: '0.625rem',
                            },
                        },
                        '& .MuiTableRow-root': {
                            '&:last-child': {
                                '& td': {
                                    border: 0,
                                },
                            },
                        },
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        padding: '24px 16px',
                        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
                        borderRadius: 16,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        // backgroundColor: isDarkMode ? 'rgb(44, 44, 44)' : 'rgb(255,255,255)',
                        '&.MuiPopover-paper': {
                            boxShadow: '0px 8px 40px rgba(51, 86, 116, 0.1);',
                            marginTop: 3,
                        },
                    },
                    rounded: {
                        borderRadius: 24,
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        minWidth: 500,
                        [breakpoints.down('sm')]: {
                            borderRadius: 0,
                            minWidth: 300,
                        },
                    },
                },
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        borderRadius: 10,
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: '0.875rem',
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    margin: 'dense',
                    variant: 'outlined',
                    fullWidth: true,
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        paddingRight: '32px !important',
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            padding: '12px 24px',
                        },
                    },
                },
            },
            MuiLink: {
                defaultProps: {
                    underline: 'none',
                    variant: 'body1',
                },
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        minWidth: 30,
                        height: 30,
                        fontSize: 12,
                    },
                },
            },
        },
        palette: {
            primary: {
                main: '#3B43F2',
                dark: 'rgba(56, 59, 123, 1)',
                light: '#3472D6',
            },
            secondary: {
                main: '#FFB100',
            },
            error: {
                main: red.A400,
            },
            success: { light: green[600], main: '#10B981', dark: green[400], contrastText: '#fff' },
            text: {
                secondary: 'rgba(0,0,0,0.7)',
            },
            background: { default:'rgba(255, 255, 255, 1)' },
        },
        typography: {
            fontFamily: ['Open Sans', 'sans-serif'].join(','),

            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
            },
            h1: {
                fontSize: '2.275rem',
                fontWeight: 600,
            },
            h2: {
                fontSize: '1.625rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '1.375rem',
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
            h5: {
                fontSize: '1rem',
                fontWeight: 600,
            },
            h6: {
                fontSize: '0.875rem',
                fontWeight: 500,
            },
        },
        shadows: [
            'none',
            'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
            'rgba(0, 0, 0, 0.15) 0px 1px 4px 0px',
            'rgba(0, 0, 0, 0.15) 0px 4px 8px 0px',
            'rgba(0, 0, 0, 0.15) 0px 4px 8px 0px',
            'rgba(0, 0, 0, 0.1) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.1) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.15) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.15) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.2) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.2) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 6px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 7px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 8px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 9px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 10px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 11px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 12px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 13px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 14px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 15px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 16px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 17px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 18px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 19px 0px',
        ],
    });
};

declare module '@mui/material/styles' {
    interface Theme {
        dark: boolean;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        dark?: boolean;
    }
}

export default theme;
