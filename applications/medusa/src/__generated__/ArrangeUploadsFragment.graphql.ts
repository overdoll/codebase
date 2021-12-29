/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArrangeUploadsFragment = {
    readonly content: ReadonlyArray<{
        readonly id: string;
        readonly urls: ReadonlyArray<{
            readonly url: string;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"DraggableContentFragment">;
    }>;
    readonly " $refType": "ArrangeUploadsFragment";
};
export type ArrangeUploadsFragment$data = ArrangeUploadsFragment;
export type ArrangeUploadsFragment$key = {
    readonly " $data"?: ArrangeUploadsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArrangeUploadsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeUploadsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DraggableContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '9334955c3fb20b7162e3706517169d1b';
export default node;
