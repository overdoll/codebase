/**
 * @generated SignedSource<<6c409ba0533f05798584b8f9f965e7e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectMethodChoiceViewerFragment$data = {
  readonly savedPaymentMethods: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      };
    }>;
  };
  readonly __typename: "Account";
  readonly " $fragmentType": "SelectMethodChoiceViewerFragment";
};
export type SelectMethodChoiceViewerFragment = SelectMethodChoiceViewerFragment$data;
export type SelectMethodChoiceViewerFragment$key = {
  readonly " $data"?: SelectMethodChoiceViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectMethodChoiceViewerFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectMethodChoiceViewerFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountSavedPaymentMethodConnection",
      "kind": "LinkedField",
      "name": "savedPaymentMethods",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountSavedPaymentMethodEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountSavedPaymentMethod",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "fc248299a2ef31e50f9696c89bfbfcea";

export default node;
