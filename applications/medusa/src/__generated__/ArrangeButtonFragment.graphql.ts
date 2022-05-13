/**
 * @generated SignedSource<<f4e9112b54eb6262d81cfce11bb3cba4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeButtonFragment$data = {
  readonly id: string;
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly __typename: string;
  }>;
  readonly " $fragmentType": "ArrangeButtonFragment";
};
export type ArrangeButtonFragment = ArrangeButtonFragment$data;
export type ArrangeButtonFragment$key = {
  readonly " $data"?: ArrangeButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeButtonFragment">;
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
  "name": "ArrangeButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
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

(node as any).hash = "a5b783ab61a8d54f4186470f117d0286";

export default node;