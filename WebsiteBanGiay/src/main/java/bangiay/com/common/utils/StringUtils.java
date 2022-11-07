package bangiay.com.common.utils;

public class StringUtils {
    public static final String EMPTY = "";

    private StringUtils() {
    }

    public static boolean isEmpty(String s) {
        return s == null || s.length() == 0;
    }

    public static boolean isTrimEmpty(String s) {
        return s == null || s.trim().length() == 0;
    }

    public static boolean isEmpty(Object o) {
        return o == null || StringUtils.isEmpty(o.toString());
    }

}
