#include <stdio.h>

int main(long num_sec) {
    long z = num_sec;
    z += 719468;

    const long era = z / 146097;

    const long doe = z - era * 146097;

    
    const long yoe = (doe - doe/1460 + doe/36524 - doe/146096) / 365;

    const unsigned int y = yoe + era * 400;

    const unsigned int doy = doe - (365 * yoe + yoe/4 - yoe/100);

    const unsigned int mp = (5 * doy + 2) / 153;
    
    const unsigned int d = doy - ((153 * mp + 2) / 5) + 1;

    unsigned int m = 0;
    if (mp < 10) {
        m = mp + 3;
    } else {
        m = mp - 9;
    }

    printf("%d, %d, %d", m, d, y);
    return 0;
}
