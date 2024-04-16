import { createStyles, makeStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    display: 'flex',
    fontVariant: 'proportional-nums',
    listStyle: 'none',
    lineHeight: '1',
    margin: '0',
    padding: '0',
    gap: '8px',
  },
  count: {
    minWidth: '28px',
    lineHeight: '1rem',
    padding: '0 8px',
    fontVariantNumeric: 'tabular-nums',
    justifyContent: 'center',
    fontSize:'16px',
    fontWeight:400,
    alignItems: 'center',
    borderBottomLeftRadius:'3px',
    borderRight: '1px solid white',
    borderTopLeftRadius:'3px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    letterSpacing: '-.0125rem',
  },
  item: {
    display: 'flex',
    fontSize: '18px',
    fontWeight: 500,
    textAlign: 'center',
    borderRadius: '3px',
    minHeight: '28px',
  },
  text: {
    padding: '0 4px',
    lineHeight: '1',
    textDecoration: 'none',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    minWidth: '28px',
    fontSize: '18px',
    fontWeight: 500,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    letterSpacing: '0',
  },
  item_disabled: {
    backgroundColor: '#e7e7e7',
    color: '#828282',
  },
  item_disabled_text: {
    backgroundColor: '#bebebe',
    color: '#fff',
  },
  item_critical: {
    backgroundColor: '#ffdad8',
    color: '#9e261e',
  },
  item_critical_text: {
    backgroundColor: '#9e261e',
    color: '#fff',
  },
  item_high: {
    backgroundColor: '#ffdbcc',
    color: '#9b3d15',
  },
  item_high_text: {
    backgroundColor: '#ce5019',
    color: '#fff',
  },
  item_medium: {
    backgroundColor: '#ffe8cd',
    color: '#925c1e',
  },
  item_medium_text: {
    backgroundColor: '#d68000',
    color: '#fff',
  },
  item_low: {
    backgroundColor: '#eeeeee',
    color: '#585675',
  },
  item_low_text: {
    backgroundColor: '#88879e',
    color: '#fff',
  },
});

export const useSnykCounterStyle = makeStyles(styles);
