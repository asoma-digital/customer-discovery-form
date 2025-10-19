export const NavigationButtons = ({ 
    currentPage, 
    totalPages, 
    onPrevious, 
    onNext, 
    isSubmitting 
}) => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            <button
                type="button"
                onClick={onPrevious}
                style={{ visibility: currentPage === 0 ? 'hidden' : 'visible' }}
            >
                Previous
            </button>
            {currentPage === totalPages - 1 ? (
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            ) : (
                <button type="button" onClick={onNext}>
                    Next
                </button>
            )}
        </div>
    );
};