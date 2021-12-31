/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DisableMultiFactorFragment = {
    readonly canDisableMultiFactor: boolean;
    readonly " $refType": "DisableMultiFactorFragment";
};
export type DisableMultiFactorFragment$data = DisableMultiFactorFragment;
export type DisableMultiFactorFragment$key = {
    readonly " $data"?: DisableMultiFactorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DisableMultiFactorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DisableMultiFactorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canDisableMultiFactor",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '1be25ed3f5abc735c8b6b12b21aa719c';
export default node;
