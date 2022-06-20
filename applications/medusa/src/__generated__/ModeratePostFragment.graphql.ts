/**
 * @generated SignedSource<<e9e0d64824a71cce5d97015ea51e878d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModeratePostFragment$data = {
  readonly id: string;
  readonly post: {
    readonly id: string;
    readonly club: {
      readonly name: string;
    };
  };
  readonly " $fragmentType": "ModeratePostFragment";
};
export type ModeratePostFragment = ModeratePostFragment$data;
export type ModeratePostFragment$key = {
  readonly " $data"?: ModeratePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModeratePostFragment">;
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
  "name": "ModeratePostFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Club",
          "kind": "LinkedField",
          "name": "club",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostModerator",
  "abstractKey": null
};
})();

(node as any).hash = "4508fdab7f79e2e29525d427f948e270";

export default node;
