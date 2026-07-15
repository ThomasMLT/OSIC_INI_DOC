v {xschem version=3.4.8RC file_version=1.3}
G {}
K {}
V {}
S {}
F {}
E {}
N -20 -70 -20 -25 {lab=GND}
N -20 -170 -20 -130 {lab=I_exp}
N -20 140 -20 180 {lab=GND}
N -20 40 -20 80 {lab=ctrl_node}
N -20 -170 110 -170 {lab=I_exp}
N 110 -110 110 -25 {lab=GND}
C {gnd.sym} -20 -25 0 1 {name=l2 lab=GND}
C {lab_wire.sym} -20 -170 0 0 {name=p2 sig_type=std_logic lab=I_exp}
C {bsource.sym} -20 -100 2 0 {name=B_I_expr VAR=I FUNC=
"exp(V(ctrl_node))"
m=1}
C {vsource.sym} -20 110 0 0 {name=Vctrl value=0 savecurrent=false}
C {gnd.sym} -20 180 0 0 {name=Vmem4 lab=GND
value=0.6}
C {lab_wire.sym} -20 40 0 0 {name=Vmem5 sig_type=std_logic lab=ctrl_node
}
C {res.sym} 110 -140 0 0 {name=R1
value=1
footprint=1206
device=resistor
m=1}
C {gnd.sym} 110 -25 0 1 {name=l1 lab=GND}
C {devices/code_shown.sym} 225 -160 0 0 {name=NGSPICE only_toplevel=true 
value="
.param temp=27
.control
save V(I_exp)
dc Vctrl 0 12 1
write dc_nonlinear_sweep.raw
plot V(I_exp)

.endc
"}
