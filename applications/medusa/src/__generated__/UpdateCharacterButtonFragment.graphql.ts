/**
 * @generated SignedSource<<b1a718950dd6f139ac6f65414d94afde>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCharacterButtonFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly failed: boolean;
      readonly processed: boolean;
    };
  }>;
  readonly id: string;
  readonly " $fragmentType": "UpdateCharacterButtonFragment";
};
export type UpdateCharacterButtonFragment$key = {
  readonly " $data"?: UpdateCharacterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateCharacterButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateCharacterButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "processed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "failed",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "50307c13e4e18bba045bbbf282f54ebb";

export default node;
