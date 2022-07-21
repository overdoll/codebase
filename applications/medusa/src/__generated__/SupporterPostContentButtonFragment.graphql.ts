/**
 * @generated SignedSource<<5032a0d60a43b75388c435b8ab55cdd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterPostContentButtonFragment$data = {
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "SupporterPostContentButtonFragment";
};
export type SupporterPostContentButtonFragment$key = {
  readonly " $data"?: SupporterPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterPostContentButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporterOnly",
      "storageKey": null
    },
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
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "1fc2a1c404698fc7dae44b5d36ec1c54";

export default node;
