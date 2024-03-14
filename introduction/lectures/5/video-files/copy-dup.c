#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    char *s = get_string("s: ");
    // s cannot be allocated (memory full)
    if (s == NULL)
    {
        return 1;
    }
    // memory allocation
    char *t = malloc(strlen(s) + 1);
    // t cannot be allocated (memory full)
    if (t == NULL)
    {
        return 1;
    }

    // copy the s string to the t string
    strcpy(t, s);

    if (strlen(t) > 0)
    {
        // t (in new chunk of memory due to malloc {go to 13}) first character updates to Uppercase
        t[0] = toupper(t[0]);
    }

    printf("%s\n", s);
    printf("%s\n", t);
}