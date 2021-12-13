/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MultiFactorFragment = {
    readonly accountStatus: {
        readonly multiFactor: {
            readonly totp: boolean;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"TotpFragment" | "RecoveryCodeFragment">;
    readonly " $refType": "MultiFactorFragment";
};
export type MultiFactorFragment$data = MultiFactorFragment;
export type MultiFactorFragment$key = {
    readonly " $data"?: MultiFactorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MultiFactorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MultiFactorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationTokenAccountStatus",
      "kind": "LinkedField",
      "name": "accountStatus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MultiFactor",
          "kind": "LinkedField",
          "name": "multiFactor",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totp",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TotpFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RecoveryCodeFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
(node as any).hash = '48ab9cc39de8cb455f9a2cbdc1a5e39b';
export default node;
