using System;
using System.Threading.Tasks;

namespace com.blackpear.edge.test
{
    public class Lib
    {
        public async Task<object> HasError(object input)
        {
            var f = new Func<string>(() => { throw new Exception(".NET Exception"); });
            return await Task.Factory.StartNew(f);
        }

        public async Task<object> GetString(object input)
        {
            var f = new Func<string>(() => ".NET Unary Func result");
            return await Task.Factory.StartNew(f);
        }

        public async Task<object> ReflectString(object input)
        {
            var s = (string) input;
            var f = new Func<string>(() => s);
            return await Task.Factory.StartNew(f);
        }

        public async Task<object> GetJsonString(object input)
        {
            var f = new Func<string>(() => "{\"foo\":\"bar\"}");
            return await Task.Factory.StartNew(f);
        }

        public async Task<object> Add(object input)
        {
            var args = (object[])input;
            var a = (int)args[0];
            var b = (int)args[1];

            var f = new Func<int>(() => a + b);
            return await Task.Factory.StartNew(f);
        }
    }
}
