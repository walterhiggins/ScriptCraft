<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="list-item[name='Development Build']">
  <bukkit>
    <url><xsl:text>http://dl.bukkit.org</xsl:text><xsl:value-of select="latest_artifact/file/url" /></url>
  </bukkit>
</xsl:template>

<xsl:template match="text()" />

</xsl:stylesheet>