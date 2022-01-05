/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStateDraftPreviewFragment = {
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"checkPostRequirementsFragment">;
    readonly " $refType": "PostStateDraftPreviewFragment";
};
export type PostStateDraftPreviewFragment$data = PostStateDraftPreviewFragment;
export type PostStateDraftPreviewFragment$key = {
    readonly " $data"?: PostStateDraftPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStateDraftPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateDraftPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "checkPostRequirementsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'bec4b22840e222e786dbc4824a33b668';
export default node;
